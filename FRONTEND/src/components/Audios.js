import React, { useEffect, useState } from "react";
import useCheckContext from "../hooks/useCheckContext";
import audio from "../audio/mixkit-repeating-arcade-beep-1084.wav";
import loseAudio from "../audio/mixkit-retro-arcade-lose-2027.wav";
import alert from "../audio/mixkit-video-game-mystery-alert-234.wav";

const Audios = () => {
	const { isOnePlayer, playerMove, result, computerMove } = useCheckContext();

	const [audioIsPlaying, setAudioIsPlaying] = useState(false);
	useEffect(() => {
		if (result === "Player wins" || result === "Computer wins") {
			setTimeout(() => {
				setAudioIsPlaying(true);
			}, 2000);
		} else {
			setAudioIsPlaying(false);
		}
	}, [result]);

	return (
		<div>
			{/* Sound on move click */}
			{(playerMove || computerMove) && (
				<audio
					src={alert}
					autoPlay={true}
					className="audio"
				/>
			)}

			{/* Sound on victory */}
			{isOnePlayer &&
				result === "Player wins" &&
				(audioIsPlaying ? (
					<audio
						src={audio}
						autoPlay={true}
						className="audio"
					/>
				) : (
					""
				))}

			{/* Sound on lose */}
			{isOnePlayer &&
				result === "Computer wins" &&
				(audioIsPlaying ? (
					<audio
						src={loseAudio}
						autoPlay={true}
						className="audio"
					/>
				) : (
					""
				))}
		</div>
	);
};

export default Audios;
