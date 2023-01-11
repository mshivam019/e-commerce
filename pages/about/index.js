import Head from "next/head";
import { useState, useEffect } from "react";


export default function index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-gray-700 text-2xl font-medium block mt-16">
        About
      </h3>
    </div>
  )
}


