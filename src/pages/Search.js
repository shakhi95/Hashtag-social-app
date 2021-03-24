import React, { useState } from "react";
import myApi from "../api/myApi";
import { PostBox } from "../components";

const Search = () => {
  //
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (term.length === 0) {
      setError("noTerm");
    } else {
      setLoading(true);
      try {
        const { data } = await myApi.get(`/posts?q=${term}`);
        if (data.length === 0) {
          setError("noResult");
        } else {
          setResults(data);
        }
      } catch (error) {
        setError("noAPI");
      }
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="py-5 text-center">
          <span className="spinner-border"></span>
        </div>
      );
    }

    if (error === "noResult") {
      return (
        <div className="py-5 text-center text-danger">
          <h6>نتیجه ای مطابق جستجو شما یافت نشد.</h6>
        </div>
      );
    }

    if (error === "noAPI") {
      return (
        <div className="py-5 text-center text-danger">
          <h6>ارتباط با API برقرار نشد.</h6>
        </div>
      );
    }

    return results.map((post) => (
      <PostBox key={post.postUnqId} postDetails={post} />
    ));
  };

  return (
    <div>
      <form
        className="bg-light p-3 border border-primary mb-5"
        style={{ borderRadius: "1rem" }}
        onSubmit={onSubmit}
      >
        <h6 className="mb-3">جستجو در پست ها:</h6>
        <div className="row">
          <div className="col-8 col-lg-9">
            <input
              type="text"
              className={`form-control rounded-pill ${
                error === "noTerm" ? "is-invalid" : ""
              }`}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                setError("");
                setResults([]);
              }}
            />
          </div>
          <div className="col-4 col-lg-3">
            <div className="w-100">
              <button
                type="submit"
                className="btn btn-primary rounded-pill w-100"
              >
                جستجو
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>{renderResults()}</div>
    </div>
  );
};

export default Search;
