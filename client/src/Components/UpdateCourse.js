
function UpdateCourse () {

    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="hej"/>
                        <p>By Hoe Smith</p>
                        <label for="courseDescription" name="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">Description</textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="1 sekund"/>
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">Materials</textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button--secondary">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateCourse;