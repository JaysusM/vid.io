"use client";
import useScreenRecordController from '@hooks/use-screen-record-controller.hook';
import { Button } from '@ui/button';

const Controller = () => {
    const [startRecord, stopRecord, media] = useScreenRecordController();

    return <>
        <Button onClick={startRecord}>Start</Button>
        <Button onClick={stopRecord}>Stop</Button>
        { media && <video src={media} width="500" height="300" controls /> }
    </>
}

export default Controller;