import React from "react";
import StockCommentForm, {
  CommentFormInputs,
} from "./StockCommentForm/StockCommentForm";
import { CommentPostApi } from "@/services/CommentService";
import { toast } from "react-toastify";

interface Props {
  stockSymbol: string | undefined;
}

const StockComment = ({ stockSymbol }: Props) => {
  const handleComment = (e: CommentFormInputs) => {
    CommentPostApi(e.title, e.content, stockSymbol as string)
      .then((res) => {
        if (res) {
          toast.success("Comment created");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
  );
};

export default StockComment;
