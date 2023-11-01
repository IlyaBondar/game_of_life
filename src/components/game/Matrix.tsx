'use client'

import { useRef, useEffect, useCallback, useState, MouseEvent } from 'react';
import useDrawMatrix from '@/hooks/useDrawMatrix';
import fakeData from '@/utils/data/fakeData.json'
import { Matrix, WorkerCommands, WorkerData } from '@/types/types';
import Button from '../shared/Button';
import './styles.css';

export default function Matrix() {
    const initialData:Matrix = fakeData.starting_state as Matrix;

    const [ data, setData ] = useState(initialData);
    const [ started, setStarted ] = useState(WorkerCommands.Stop);
    const workerRef = useRef<Worker>()

    useEffect(() => {
        workerRef.current = new Worker(new URL('@/workers/gameOfLifeWorker.ts', import.meta.url))
        workerRef.current.onmessage = (event: MessageEvent<WorkerData>) => {
            const { data, status } = event.data;
            setData(data);
            setStarted(status);
        }
        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    const handleWork = useCallback(async (e: MouseEvent) => {
        e.preventDefault()
        const status = started === WorkerCommands.Start
            ? WorkerCommands.Pause
            : WorkerCommands.Start;
        workerRef.current?.postMessage({
            data: started === WorkerCommands.Pause ? data : initialData,
            status
        });
    }, [data, initialData, started])

    const handleStop = useCallback(async (e: MouseEvent) => {
        e.preventDefault()
        workerRef.current?.postMessage({
            data,
            status: WorkerCommands.Stop
        });
    }, [data])

    const canvasRef = useDrawMatrix(data);
    return (
        <form className='flex flex-col'>
            <canvas id="game_area" width="500" height="500" ref={canvasRef}/>
            <div className='flex flex-row-reverse gap-3 my-3'>
                <Button id="start_button" onClick={handleWork}>{started === WorkerCommands.Start ? 'Pause' : 'Start'}</Button>
                <Button id="start_button" disabled={started !== WorkerCommands.Start} onClick={handleStop}>Stop</Button>
            </div>
        </form>
    )
}