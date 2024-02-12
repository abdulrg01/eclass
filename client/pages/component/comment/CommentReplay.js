import CommentItem from "./CommentItem";

export default function CommentReplay({
  data,
  user,
  id,
  activeVideo,
  refetch,
}) {
  return (
    <>
      <div className="w-full my-3">
        {data?.course?.courseData[activeVideo]?.questions.map((item, index) => (
          <CommentItem
            key={index}
            user={user}
            id={id}
            data={data}
            refetch={refetch}
            activeVideo={activeVideo}
            item={item}
          />
        ))}
      </div>
    </>
  );
}
