/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Gapcursor from "@tiptap/extension-gapcursor";
import Bold from "@tiptap/extension-bold";

// icon
import AddColBefore from "./icon/add_col_before.svg";
import AddColAfter from "./icon/add_col_after.svg";
import DeleteCol from "./icon/delete_col.svg";
import ChangeThCol from "./icon/change_th_col.svg";
import AddRowBefore from "./icon/add_row_before.svg";
import AddRowAfter from "./icon/add_row_after.svg";
import DeleteRow from "./icon/delete_row.svg";
import ChangeThRow from "./icon/change_th_row.svg";
import CombineCells from "./icon/combine_cells.svg";
import BoldIcon from "./icon/bold.svg";

// CSS
import "./css/Editor.scss";

const microcmsAdminUrl = document.referrer;

export const Editor = () => {
  const [state, setState] = useState({
    iframeId: "",
    defaultMessage: {},
  });

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (
        e.isTrusted === true &&
        e.data.action === "MICROCMS_GET_DEFAULT_DATA"
      ) {
        setState({
          iframeId: e.data.id,
          defaultMessage: e.data.message,
        });

        window.parent.postMessage(
          {
            id: e.data.id,
            action: "MICROCMS_UPDATE_STYLE",
            message: {
              height: 300,
            },
          },
          microcmsAdminUrl
        );
      }
    });
  }, []);

  const postDataToMicroCMS = (editorContent) => {
    window.parent.postMessage(
      {
        id: state.iframeId,
        action: "MICROCMS_POST_DATA",
        message: {
          data: editorContent,
        },
      },
      microcmsAdminUrl
    );
  };

  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Gapcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      content: `
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
    `,
      onCreate({ editor }) {
        if (Object.keys(state.defaultMessage).length) {
          editor.commands.setContent(state.defaultMessage.data);
        }
      },
      onUpdate({ editor }) {
        postDataToMicroCMS(editor.getHTML());
      },
    },
    [state.defaultMessage]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <img src={BoldIcon} />
        </button>
        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
          <img src={CombineCells} />
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          <img src={AddColBefore} />
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          <img src={AddColAfter} />
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          <img src={DeleteCol} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          <img src={ChangeThCol} />
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
          <img src={AddRowBefore} />
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          <img src={AddRowAfter} />
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          <img src={DeleteRow} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
          <img src={ChangeThRow} />
        </button>
      </div>
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
