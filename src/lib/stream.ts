import { StreamChat } from "stream-chat"

// Only create server client if we have the required environment variables
const streamServerClient = 
  process.env.NEXT_PUBLIC_STREAM_KEY && process.env.STREAM_SECRET
    ? StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        process.env.STREAM_SECRET,
      )
    : null;

export default streamServerClient;