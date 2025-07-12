import React, { useEffect, useState } from "react";
import StockCommentForm, {
  CommentFormInputs,
} from "./StockCommentForm/StockCommentForm";
import { CommentGetApi, CommentPostApi } from "@/services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "@/models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

interface Props {
  stockSymbol: string | undefined;
}

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);

  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    CommentPostApi(e.title, e.content, stockSymbol as string)
      .then((res) => {
        if (res) {
          toast.success("Comment created");
          getComments();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getComments = () => {
    CommentGetApi(stockSymbol as string).then((res) => {
      setLoading(false);
      setComments(res?.data || null);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
