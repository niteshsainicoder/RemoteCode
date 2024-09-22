'use client'
import { Editor } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import Popup from './popup';
import axios from 'axios';
import { useAppContext } from '@/Context/context';
import { useTheme } from '@/Context/themecontext';


const CodeEditor: React.FC<{ onCodeExecute: (output: string, time: number, error: string, loading: boolean) => void }> = ({ onCodeExecute }) => {
    const { theme } = useTheme();
    const { userData, setuserData } = useAppContext();
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('javascript');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('untitled');
    const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value !== code) {
            setCode(value || '');
            console.log('Current model value:', value);
        }
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleFileNameChange = (newName: string) => {
        setFileName(newName);
        setShowPopup(false);  // Close the popup after saving
    };
    const handleRunCode = async () => {
        onCodeExecute('', 0, '', true);
        try {
            const response = await axios.post('/api/code/execute', {
                codeContent: code,
                language: language,
            });
            if (response.status === 200) {
                console.log(response.data.output.executionTime);
                
                onCodeExecute(response.data.output.stdout, response.data.output.executionTime, response.data.error, false);
                const file = !userData.recentfiles.some(file => file.title === fileName)
                if (file) {
                    save();
                }

            }
            if (response.status === 500) {
                onCodeExecute('', 0, response.data.error, false);

            }

        } catch (err) {
            onCodeExecute('', 0, 'Failed to execute code', false);

        }
    };

    const save = async () => {
        try {
            const { _id } = userData?.currentfile || {};
            if (_id && userData.recentfiles.some(file => file._id === _id)) {
                const response = await axios.post('api/code/update', { userId: userData.id, codeId: _id, codeContent: code, language: language, }, { withCredentials: true });
                if (response.status === 200) {
                    let recentfile = userData.recentfiles.map((file) => {
                        if (file._id === _id) {
                            return { ...file, codeContent: code, language: language };
                        }
                        return file;
                    })
                    setuserData({ ...userData, recentfiles: recentfile, currentfile: { codeContent: code, language: language, title: fileName, _id: _id } });

                }
                return;
            }
            const response = await axios.post(
                "api/code/save",
                {
                    userId: userData.id,
                    codeContent: code,
                    language: language,
                    title: fileName
                },
                { withCredentials: true }
            );

            const newFile = {
                _id: response.data.model._id,
                codeContent: response.data.model.codeContent,
                language: response.data.model.language,
                title: response.data.model.title,
                userId: userData.id
            };

            // Create a new array without using the spread operator
            const updatedFiles = (userData?.recentfiles || []).concat(newFile);

            // Manually update userData
            setuserData({
                id: userData.id,
                name: userData.name,
                recentfiles: updatedFiles,
                currentfile: newFile,

            });
        }
        catch (error) {
            console.log("Save failed:", error);
        }

    }

    const newFile = () => {
        setCode('')
        setLanguage('javascript')
        setFileName('Untitled')
        userData.currentfile = null
    }
    useEffect(() => {
        if (userData?.currentfile?._id && userData?.currentfile.codeContent && userData?.currentfile.language) {
            setCode(userData?.currentfile.codeContent);
            setLanguage(userData?.currentfile.language);
            setFileName(userData?.currentfile.title);

        }

    }, [userData.currentfile])
    return (
        <div className={`w-full max-w-[full] relative  h-[500px] min-h[600px]   transition duration-200 ${theme === 'light' ? 'bg-neutral-100 text-black' : 'bg-zinc-900 text-white'}`}>
            <div className='flex items-center flex-wrap flex-grow p-1 px-2 mb-2 gap-4'>
                <h1 className={`px-1 p-1 w-fit min-w-40 max-w-40 border  text-center text-sm text-wrap overflow-x-scroll remove-scrollbar ${theme === 'light' ? 'bg-neutral-100 text-black border-black ' : 'bg-neutral-900 border-white text-white'} rounded-lg`}>{fileName}</h1>
                <button
                    type='reset'
                    className={`rotate-90 text-2xl ${theme === 'vs-dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'} rounded-full p-1`}
                    onClick={() => setShowPopup(!showPopup)}  // Show the popup when the button is clicked
                >
                    &#9998;
                </button>

                <select
                    title='lang'
                    className={`rounded-md text-sm border p-1 text-center ${theme === 'light' ? 'bg-neutral-100 text-black border-black ' : 'bg-neutral-900 border-white text-white'}`}
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>


                <p
                    onClick={handleRunCode}
                    className={`text-sm cursor-pointer ${theme === 'vs-dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'}  px-3 py-2 rounded-xl`}
                >
                    run
                </p>
                {userData.id && <> <p
                    onClick={save}
                    className={`text-sm cursor-pointer rotate-3 ${theme === 'vs-dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'}  px-2 py-1 rounded-xl`}
                >
                    💾

                </p>
                    <p
                        onClick={newFile}
                        className={`text-sm cursor-pointer ${theme === 'vs-dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'}  px-2 py-1 rounded-xl`}
                    >
                        new

                    </p></>}
            </div>
            <Editor
                defaultLanguage={language}
                language={language}
                value={code}
                theme={theme}
                defaultValue={`${language === 'javascript' ? `// ` : `#`} Write Your Code here!\n`}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}


            />
            {showPopup && (
                <Popup
                    onClose={() => setShowPopup(false)}
                    onSave={handleFileNameChange}
                    currentName={fileName}
                />
            )}
        </div>
    );
};

export default CodeEditor;
