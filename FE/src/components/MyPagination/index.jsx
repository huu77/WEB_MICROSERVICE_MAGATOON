import { Pagination } from "@mui/material"

export default function MyPagination({ count, page, onChange }) {
    return (
        <Pagination
            count={count}
            page={page}
            variant="outlined"
            shape="rounded"
            color="primary"
            size="large"
            onChange={onChange}
        />
    )
}