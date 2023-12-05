class TaskModel {
    constructor(){
        this.Id = "";
        this.Title = "";
        this.Description = "";
        this.CategoryId = 0;
        this.UserId = "";
        this.Status = "";
        this.Priority = "";
        this.Completed = 0;
        this.Deleted = 0;
        this.IsFavorite = 0;
        this.DueDate = "";
        this.Notes = "";
        this.CreatedBy = "";
        this.CreatedDateTime = "";
        this.LastUpdatedBy = "";
        this.LastUpdatedDateTime = "";
    }
}

export default TaskModel;