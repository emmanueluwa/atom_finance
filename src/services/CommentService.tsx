import { CommentPost } from "@/models/Comment";
import { handleError } from "@/utils/helpers/ErrorHandler";
import axios from "axios";

const api = "http://localhost:5195/api/comment/";

export const CommentPostApi = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
