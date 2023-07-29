import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useContentsReportId } from "../../../api/contents_report/fetchReportsList";
import ContentPage from "../../../components/content/contentPage";

const ContentReportPage = () => {
  // useEffect(() => {
  //   const fetchContent = async () => {
  //     const data = {author};
  //   };
  // }, []);
  const { state } = useLocation();
  const { id } = state || {};
  const { content, loading } = useContentsReportId(id);

  return <ContentPage data={content} />;
};

export default ContentReportPage;
