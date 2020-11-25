import React from "react";

interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: Array<Type>;
}

interface Type {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  total: number;
}
const Header: React.FunctionComponent<HeaderProps> = ({ name }) => {
  return <div>{name}</div>;
};

const Content: React.FunctionComponent<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <ul key={course.name}>
          <li>
            {course.name} {course.exerciseCount}
          </li>
        </ul>
      ))}
    </div>
  );
};

const Total: React.FunctionComponent<TotalProps> = ({ total }) => {
  return (
    <>
      <span> Number of exercises: {total} </span>
    </>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
