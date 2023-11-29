import { http } from 'msw';

export const handlers = [
    http.get(process.env.REACT_APP_API_URL.concat('/api/TaskController/GetAllTasks'), (req, res, ctx) => {        
        return res(ctx.status(200)),
            ctx.json([
                {
                    "Id": 5,
                    "Title": "CSC LMAR 620 Discussion Post",
                    "Description": "Post based on this weeks reading to the discussion forum.",
                    "CategoryId": 1,
                    "UserId": 2,
                    "Status": "Pending",
                    "Priority": "Low",
                    "Completed": 0,
                    "Deleted": 0,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 5"
                },
                {
                    "Id": 6,
                    "Title": "Create admin software data LMAR",
                    "Description": "Export admin software data for each of this years jobs.",
                    "CategoryId": 2,
                    "UserId": 2,
                    "Status": "Pending",
                    "Priority": "Medium",
                    "Completed": 0,
                    "Deleted": 0,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 6"
                }
            ])
    })
];