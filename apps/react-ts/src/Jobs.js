const Jobs = ({ jobs }) => {
  console.log("kjo ", jobs);
  return (
    <div>
      {!jobs.length ? (
        <h2>No JOBS Found!</h2>
      ) : (
        jobs.map((job, ind) => (
          <div key={ind}>
            <a href={job.jobLink}> Apply </a>
            <h2> {job.jobTitle} </h2>
            <div>
              {" "}
              {job.companyName} - {job.location}{" "}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
