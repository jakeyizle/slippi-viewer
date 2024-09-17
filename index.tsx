import React from 'react';
import './src/index.css'
import { decode } from '@shelacek/ubjson';
import { parseReplay } from './src/parser/parser';
import { useReplayStore } from "./src/state/replayStoreReact";
import { Viewer } from './src/components/viewer/Viewer';
import { useEffect } from 'react';

interface SlippiViewerProps {
    file: File
}

export default function SlippiViewer({ file }: SlippiViewerProps) {
    const setReplayData = useReplayStore((state) => state.setReplayData);
    useEffect(() => {
        async function fetchReplayData() {
            setReplayData(parseReplay(decode(await file.arrayBuffer(), { useTypedArrays: true })));
        }
        fetchReplayData();
    }, [file])

    return (
        <div className="flex max-h-screen flex-grow flex-col gap-2 pt-2 pr-4 pl-4 lg:pl-0">
            <Viewer />
        </div>
    )
}