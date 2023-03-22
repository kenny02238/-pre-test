import React from "react";
import LoadingWrapper from "./LoadingWrapper";

function FirstQuestion() {
  interface Api {
    foo(): Promise<string>;
    bar(): Promise<number>;
  }

  const api: Api = {
    //這邊foo模擬失敗的async function
    foo: async () => {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          reject(new Error("请求超時"));
        }, 3000)
      );
      return "成功";
    },
    bar: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/2"
      );
      const data = await response.json();
      return data.id;
    },
  };
  return (
    <>
      <div>模擬async失敗</div>
      <LoadingWrapper
        loadData={() => api.foo()}
        renderData={(data: string) => {
          return <div>{data}</div>;
        }}
      />
      <div>模擬async成功</div>
      <LoadingWrapper
        loadData={() => api.bar()}
        renderData={(data: number) => {
          return <div>{`API回傳UserID為：${data}`}</div>;
        }}
      />
    </>
  );
}

export default FirstQuestion;
