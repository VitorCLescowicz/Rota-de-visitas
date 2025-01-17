interface VideoPlayerProps {
    src: string;
  }
  
  const VideoPlayer = ({ src }: VideoPlayerProps) => {
    return (
      <div className="video-container">
        <video controls className="w-full rounded-lg">
          <source src={src} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;
  