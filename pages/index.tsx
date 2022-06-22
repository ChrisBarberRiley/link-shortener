import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { supabase } from "../supabase/client";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string | undefined>("");
  const [slug, setSlug] = useState<string>("");
  const [success, setSuccess] = useState<any>(null); // TODO: come back with interface
  const [message, setMessage] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const res = await fetch(`/api/shorten`);
    console.log("form submit");

    try {
      if (url && slug) {
        //TODO: check valid URL

        const { data, error } = await supabase
          .from("links")
          .insert([{ url, slug }]);

        if (!error) {
          setSuccess(data);
          setUrl("");
          setSlug("");
        }
      } else {
        setMessage("Please enter a URL and a slug");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-slate-100 text-center h-screen w-screen p-9 flex flex-col justify-between">
      <Head>
        <title>URL Shortener - cbr.gg</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center">
        <div className="flex flex-col items-center w-3/6 bg-white rounded-2xl max-w-lg p-6">
          <h1 className="text-2xl text-slate-900 ">
            Welcome to <a href="https://links.cbr.gg">Short-Links!</a>
          </h1>

          <p className="text-gray-400">
            Get started by entering a URL <br />
          </p>
          {message && <p className="text-red-500">{message}</p>}
          <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none w-1/4 bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                aria-label="Slug"
                type="text"
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <input
                className="appearance-none w-2/4 bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                aria-label="URL"
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 mt-6">
              <p className="font-bold">Success!</p>
              <p>
                Your new short link is:{" "}
                <a href={`https://links.cbr.gg/${success[0].slug}`}>
                  https://links.cbr.gg/{success[0].slug}
                </a>
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="">
        <a href="https://cbr.gg" target="_blank" className="text-slate-900">
          Powered by cbr.gg
        </a>
      </footer>
    </div>
  );
};

export default Home;
