'use client'

import { useRef, useEffect, useCallback, useState, MouseEvent, ChangeEvent } from 'react';
// import useDrawMatrix from '@/hooks/useDrawMatrix';
import { GameWorkerData, Matrix, WorkerStatuses } from '@/types/types';
import Button from '../shared/Button';
import './styles.scss';
import { getGameOfLifeResult } from '@/utils/gameOfLife';
import { parseInitialState } from '@/utils/parsers';
import { formatMessage } from '@/utils/constants';
import MatrixCanvas from './MatrixCanvas';

export default function Matrix() {
    const workerRef = useRef<Worker>();
    const iterationCountRef = useRef(0);
    const [inputValue, setInputValue] = useState("```\n00000000000000000000\n00000000000000000000\n00000000000000000000\n00000000000000000000\n00000000000000000000\n00000000000000000000\n00000000000000000000\n11111111111111111111\n00000000000000000000\n00000000000000000000\n```\nIteration number: `1000`");

    const parsedResult = parseInitialState(inputValue);
    const [ init, iterationCount ] = parsedResult.success
        ? [parsedResult.matrix, parsedResult.iterationCount]
        : [[[]], 0];
    const [ initialData, setInitialData ] = useState(init);
    const [ data, setData ] = useState(initialData);
    const [ status, setStatus ] = useState(WorkerStatuses.Stopped);

    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        const parsedResult = parseInitialState(newValue);
        const init = parsedResult.success
            ? parsedResult.matrix: [[]];
        setInitialData(init);
        setData(init);
        workerRef.current?.postMessage({
            data: init,
            status: WorkerStatuses.ForceStopped
        });
    },[])

    useEffect(() => {
        if(!workerRef.current) {
            workerRef.current = new Worker(new URL('@/workers/gameOfLifeWorker.ts', import.meta.url))
        }
        workerRef.current.onmessage = (event: MessageEvent<GameWorkerData>) => {
            iterationCountRef.current++;
            const { data, status } = event.data;
            setData(data);
            setStatus(status);
        }
        return () => {
            workerRef.current?.terminate();
        }
    }, [])

    const handleWork = useCallback(async (e: MouseEvent) => {
        e.preventDefault();
        if(status === WorkerStatuses.Stopped || status === WorkerStatuses.ForceStopped) {
            iterationCountRef.current = 0;
        }
        const nextStatus = status === WorkerStatuses.Started
            ? WorkerStatuses.Paused
            : WorkerStatuses.Started;
        workerRef.current?.postMessage({
            data: status === WorkerStatuses.Paused ? data : initialData,
            status: nextStatus
        });
    }, [data, initialData, status])

    const handleStop = useCallback(async (e: MouseEvent) => {
        e.preventDefault()
        workerRef.current?.postMessage({
            data,
            status: WorkerStatuses.Stopped
        });
    }, [data])

    return (
        <form className='flex flex-col'>
            <label htmlFor='chat__input'>Enter your matrix:</label>
            <textarea id="chat__input"
                className='font-mono rounded-md text-gray-900 mb-2 max-w-sm h-72 resize-y border'
                title={`Enter your matrix.\r\nFormat: ${formatMessage}`}
                placeholder={`Enter your matrix.\r\nFormat: ${formatMessage}`}
                value={inputValue}
                onChange={onChange}
                rows={10}
                autoFocus
            />
            <div className='text-lg'>
                { parsedResult.success ? "Parsed. You can play:" : "Not parsed: incorrect format!" }
            </div>
            { parsedResult.success && <>
                <MatrixCanvas id="game_area" data={data} />
                <div className='flex flex-row justify-between'>
                    Iterations: {iterationCountRef.current}
                    <div className='flex flex-row-reverse gap-3 my-3'>
                        <Button id="start_button" onClick={handleWork} disabled={!parsedResult.success}>
                            {status === WorkerStatuses.Started ? 'Pause' : 'Start'}
                        </Button>
                        <Button id="start_button" disabled={status !== WorkerStatuses.Started} onClick={handleStop}>Stop</Button>
                    </div>
                </div>

                Should be after {iterationCount} iteraions:
                <MatrixCanvas id="game_area" data={getGameOfLifeResult(initialData, iterationCount)} className='mb-4' />
            </>}
        </form>
    )
}