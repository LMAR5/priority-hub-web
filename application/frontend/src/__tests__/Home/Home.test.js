import Home from "../../components/Home/Home";
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Home", () => {
    // -------------------------------------------------------------------------
    // Feature: User should be able to Create a Task
    // -------------------------------------------------------------------------
    it("Renders the text field to enter a new task title correctly", async () => {
        const component = render(<Home />);
        const childComponent = await component.findByPlaceholderText("Add your task here...");
        expect(childComponent).toBeInTheDocument();
    });

    it("Check if there is a Create button displayed", async () => {
        const component = render(<Home />);
        const createBtn = await component.findByTestId("create_btn");
        expect(createBtn).toBeInTheDocument();
    });

    it("Should be able to create a Task with valid values", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const createBtn = await component.findByTestId("create_btn");
        //Get the input fields
        const taskTitleInput = await screen.findByTestId("create_task_title");
        const taskDueDateInput = await screen.findByTestId("create_duedate_input");
        const taskCategoryInput = await screen.findByTestId("create_cat_select");
        //Type valid values for title, due date, category        
        let fName = "Task ".concat(new Date().toISOString().slice(0, 19));
        await user.type(taskTitleInput, fName);
        await user.type(taskDueDateInput, "2023-12-21T14:05");
        await user.selectOptions(taskCategoryInput, "2");
        //Click the Create button
        await user.click(createBtn);
        //Click the Swal 'Create task' button
        await waitFor(async () => {
            const createTaskSuccess = await screen.findByText('Create task');
            user.click(createTaskSuccess);
            //Click the Swal 'OK' button
            const createTaskOkSuccess = await screen.findByText('Task was successfuly created');
            expect(createTaskOkSuccess).toBeInTheDocument();
        });
    });

    it("Should not be able to create a Task with blank/empty values", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const createBtn = await component.findByTestId("create_btn");
        //Click the Create button
        await user.click(createBtn);
        //Click the Swal 'Create task' button
        await waitFor(async () => {
            const completeFieldMsg = await screen.findByText('Complete all fields.');
            expect(completeFieldMsg).toBeInTheDocument();
        });
    });


    it("Should be able to see the title of a Task", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();    
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const titleSelectedTask = (await screen.findByTestId("view_task_title"));
            expect(titleSelectedTask).toHaveValue("CSC 620 Discussion Post");
        });
    });

    it("Should be able to edit the task title", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const editBtn = await screen.findByTestId("viewform_edit_btn");
            await user.click(editBtn);
            const titleSelectedTitleTask = await screen.findByTestId("editform_task_title");
            await user.clear(titleSelectedTitleTask);
            await user.type(titleSelectedTitleTask, "Updating task");
            expect(titleSelectedTitleTask).toHaveValue("Updating task");
        });
    });

    it("Should be able to edit the task category", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const editBtn = await screen.findByTestId("viewform_edit_btn");
            await user.click(editBtn);
            const categorySelectedTask = await screen.findByTestId("editform_task_cat");
            await user.selectOptions(categorySelectedTask, "6");
            expect(categorySelectedTask).toHaveValue("6");
        });
    });

    // -------------------------------------------------------------------------
    // Feature: User should be able to Complete a Task
    // -------------------------------------------------------------------------    
    it("Should be able to display the Complete button", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const editBtn = await screen.findByTestId("viewform_edit_btn");
            await user.click(editBtn);
            const completeTaskBtn = await screen.findByTestId("complete_task_btn");
            expect(completeTaskBtn).toBeInTheDocument();
        });
    });

    it("Should be able to display confirm message to complete a task", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const editBtn = await screen.findByTestId("viewform_edit_btn");
            await user.click(editBtn);
            const completeTaskBtn = await screen.findByTestId("complete_task_btn");
            await user.click(completeTaskBtn);
            const confirmMessageUpd = await screen.findByText("This action will complete this task.");
            expect(confirmMessageUpd).toBeInTheDocument();
        });
    });

    // it("Should be able to save changes of an edited task", async () => {
    //     const component = render(<Home />);
    //     const user = userEvent.setup();
    //     component.debug();
    //     const selectedTaskBtn = await component.findByText("CSC LMAR 620 Discussion Post");        
    //     await user.click(selectedTaskBtn);
    //     await waitFor(async () => {
    //         const editBtn = await screen.findByTestId("viewform_edit_btn");
    //         await user.click(editBtn);
    //         const saveTaskBtn = await screen.findByTestId("editform_save_btn");
    //         await user.click(saveTaskBtn);
    //         const confirmMessageUpd = await screen.findByText("This action will update this task.");
    //         expect(confirmMessageUpd).toBeInTheDocument();
    //     });
    // });
    
    // -------------------------------------------------------------------------
    // Feature: User should be able to track their time when working on a Task
    // -------------------------------------------------------------------------
    it("Renders the Stopwatch component in the document", () => {
        const component = render(<Home />);
        const childComponent = component.getByText("Stopwatch");
        expect(childComponent).toBeInTheDocument();
    });

    it("Should be able to display a Start button to track the time", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
        await user.click(selectedTaskBtn);
        await waitFor(async () => {
            const editBtn = await screen.findByTestId("viewform_edit_btn");
            await user.click(editBtn);
            const saveTaskBtn = await screen.findByTestId("stopwatch_start_btn");
            expect(saveTaskBtn).toBeInTheDocument();
        });
    });

    // it("Should be able to display confirmation message to Start tracking the time", async () => {
    //     const component = render(<Home />);
    //     const user = userEvent.setup();
    //     const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
    //     await user.click(selectedTaskBtn);
    //     await waitFor(async () => {
    //         const editBtn = await screen.findByTestId("viewform_edit_btn");
    //         await user.click(editBtn);
    //         const saveTaskBtn = await screen.findByTestId("stopwatch_start_btn");
    //         expect(saveTaskBtn).toBeInTheDocument();
    //         await user.click(saveTaskBtn);
    //         const msgConfirmStartTrack = await screen.findByText("This action will create a new tracking record for this task");
    //         expect(msgConfirmStartTrack).toBeInTheDocument();
    //     });
    // });

    it("Should be able to display a Stop button to stop tracking the time", async () => {
        const component = render(<Home />);
        const user = userEvent.setup();
        const selectedTaskBtn = await component.findByText("CSC 620 Discussion Post");
    });
})