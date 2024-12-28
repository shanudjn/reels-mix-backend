type MessageProps = {
  message: string;
  variant: "error" | "success";
};
const Message = ({ message, variant }: MessageProps) => {
  return (
    <div
      className={`p-4 text-white ${
        variant === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Message;
