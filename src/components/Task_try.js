import React from "react";

const Task = ({ key, index, item, onSaveTrack }) => {
  let isEdit = false;
  let textarea = {};
  const edit = () => {
    console.log("edit");
    isEdit = true;
  };

  const save = () => {
    //console.log("save", this.textarea.value);

    onSaveTrack(index, "rr");
    //console.log(val);

    isEdit = false;
  };

  const remove = () => {
    //console.log("remove");
    //this.props.delBlock(this.props.index);
  };

  const viewNorm = () => {
    return (
      <div className="box">
        <div className="elem_row">
          <div className="text">{item.name}</div>
        </div>
        <div className="elem_row">
          <button onClick={edit} className="btn ligth">
            edit
          </button>
        </div>
        <div className="elem_row">
          <button onClick={remove} className="btn red">
            delete
          </button>
        </div>
      </div>
    );
  };

  const viewEdit = () => {
    return (
      <div className="box">
        <div className="elem_row">
          <textarea
            ref={text => {
              textarea = text;
            }}
            defaultValue={item.name}
          />
        </div>
        <div className="elem_row">
          <button onClick={save} className="btn ok">
            save
          </button>
        </div>
      </div>
    );
  };

  if (isEdit) return viewEdit();
  return viewNorm();
};

export default Task;
