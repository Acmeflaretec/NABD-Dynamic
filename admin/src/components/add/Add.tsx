import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  urlQuery: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = ({ urlQuery, columns, setOpen }: Props) => {
  const queryClient = useQueryClient();



  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(`http://localhost:8800/api/${urlQuery}s`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${urlQuery}s`]);
    },
  });

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate();
    setOpen(false)
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="closeBtn" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>add new {urlQuery} </h1>

        <form onSubmit={handleSubmit}>
          {columns
            .filter((col) => col.field !== "id" && col.field !== "img")
            .map((column) => (
              <div key={column.headerName} className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
            <button className="submitBtn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
