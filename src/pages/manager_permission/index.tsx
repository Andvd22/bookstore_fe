import React, { useMemo } from "react";
import TableCRUD from "@/components/table_crud";

import { FormCustomField } from "@/components/form";



const ManagerPermission: React.FC = () => {

    const { fields } = useMemo(() => {
        const fields: FormCustomField[] = [
            {
                type: "text",
                name: "description",
                size: 6,
                data: {
                    label: "Mô tả"
                },
                isField: false,
            },
            {
                type: "text",
                name: "activity",
                size: 6,
                data: {
                    label: "Đang hoạt động"
                },
                isField: false,
            },
        ];

        return { fields };
    }, []);



    return (
        <>
            <TableCRUD
                model=""
                fields={fields}
                cells={{}}
            />
        </>
    )
}

export default ManagerPermission;