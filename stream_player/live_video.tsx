"use client";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { use, useEffect, useRef, useState } from "react";
import { FullScreenControl } from "./full_screen";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume_control";
import "../app/globals.css";
interface props {
  participant: Participant;
}
const LiveVideo = ({ participant }: props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setvolume] = useState(0);
  const onChange = (value: number) => {
    console.log(value)
    setvolume(+value);
    console.log(volume);
    if (videoRef?.current) {
      console.log("sldkfjdslfs")
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };
  const toggleMute = () => {
    const isMuted = volume === 0;
    console.log(volume);
         
    setvolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
    console.log(volume);
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  useEffect(() => {
    onChange(0);
  }, []);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  console.log(isFullScreen);
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (WrapperRef?.current) {
      WrapperRef.current.requestFullscreen();
    }
  };
  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement != null;
    setIsFullScreen(isCurrentlyFullScreen);
  };
  useEventListener("fullscreenchange", handleFullScreenChange, WrapperRef);
  return (
    <div ref={WrapperRef} className="relative outer aspect-video flex ">
      <video ref={videoRef} width="100%" />
      <div
        className="absolute custom  h-full w-full opacity-0 hover:opacity-100 
      hover:transition-all"
      >
        <div className="absolute cus  flex h-14 w-full items-center justify-between  px-4">
          <VolumeControl onChange={onChange} value={volume} onToggle={toggleMute} />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
