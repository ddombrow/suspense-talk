// 🚨 This should NOT be copy/pasted for production code and is only here
// for experimentation purposes. The API for suspense (currently throwing a
// promise) is likely to change before suspense is officially released.
// This was strongly inspired by work done in the React Docs by Dan Abramov
function createResource(asyncFn) {
    let status = "pending";
    let result;
    let promise = asyncFn().then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    )
    return {
        read: () => {
            if (status === "pending") throw promise;
            if (status === "error") throw result;
            if (status === "success") return result;
            throw new Error("This should be impossible");
        }
    }
}

export default createResource;