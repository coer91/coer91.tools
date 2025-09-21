export interface IBulkLoad<T> {
    rowsUploaded: T[];
    rowsExisting: T[];
    rowsIssues: T[];
}