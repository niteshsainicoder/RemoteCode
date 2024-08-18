'use client';

import { Editor } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor';
import React, { useRef, useState } from 'react';
import Popup from './popup';

// Define custom types for better type safety
type EditorType = monacoEditor.editor.IStandaloneCodeEditor;
type MonacoType = typeof monacoEditor;

const CodeEditor: React.FC = () => {
    const editorRef = useRef<EditorType | null>(null);
    const [code, setCode] = useState<string>('');
    const [theme, setTheme] = useState<string>('vs-dark');
    const [language, setLanguage] = useState<string>('javascript');

    const handleEditorDidMount = (editor: EditorType, monaco: MonacoType) => {
        editorRef.current = editor;
        console.log(editor, monaco);
    };

    const showValue = () => {
        if (editorRef.current) {
            alert(editorRef.current.getValue());
        }
    };

    const handleEditorChange = (value: string | undefined, event: monacoEditor.editor.IModelContentChangedEvent) => {
        if (value !== code) {
            setCode(value || '');
            console.log('Event:', event);
            console.log('Current model value:', value);
        }
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    return (
        <div className={`w-full  relative max-h-[550px] h-[550px] transition duration-200 ${theme === 'light'? 'bg-neutral-100 text-black':'bg-zinc-900 text-white'}`}>
            <div className='flex  items-center p-2 gap-5 mb-1'>
                <h1 className='px-5 p-2 border rounded-lg'>Title of your file</h1>
                <button type='reset' className={`rotate-90 text-2xl ${theme === 'vs-dark'?'hover:bg-neutral-800':'hover:bg-neutral-200'} rounded-full p-1`}>&#9998;</button>
                <button
                    onClick={() => {
                        setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
                    }}
                >
                    Theme
                </button>
                <select title='lang' className={` rounded-md border p-1 text-center ${theme === 'light'? 'bg-neutral-100 text-black border-black ':'bg-neutral-900 border-white text-white'}`} value={language} onChange={handleLanguageChange}>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>
            </div>
            <Editor
            
                defaultLanguage={language}
                language={language}
                theme={theme}
                defaultValue='// Write Your Code here!'
                onMount={handleEditorDidMount}
                onChange={handleEditorChange} // Use the function directly
            />
            <div>
                <button onClick={showValue}>Show the value</button>
            </div>
            <Popup />
        </div>
    );
};

export default CodeEditor;
