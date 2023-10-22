package com.app.teamProject.dto;

import lombok.Data;

@Data
public class Pagination {
    private Integer page;
    private int rowCount;
    private int pageCount;
    private int startPage;
    private int endPage;
    private int realEnd;
    private boolean prev, next;
    private int total;

    public void progress() {
        this.page = page == null ? 1 : page;
        this.rowCount = 6;
        this.pageCount = 6;
        this.total = total;
        this.endPage = (int)(Math.ceil(page / (double)pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;
        this.realEnd = (int)Math.ceil(total / (double)rowCount);
        if(realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }
        this.prev = startPage > 1;
        this.next = page < realEnd;
    }
}
