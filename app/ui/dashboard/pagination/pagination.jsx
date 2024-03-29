"use client";
import React from 'react'
import styles from './pagination.module.css'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const Pagination = ({count}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 10;
  
  const hasPrev= ITEM_PER_PAGE * (parseInt(page)-1) > 0
  const hasNext= ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < count;



  const handleChangePage = (type) => {
    const newPage = type === "prev" ? parseInt(page) - 1 : parseInt(page) + 1;
    params.set("page", newPage);
    replace(`${pathname}?${params}`);
  };
  

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Previous</button>
      <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
    </div>
  );
};

export default Pagination;