const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const { parts } = props;

  return (
    <>
      <Part part={parts[0].name} numberOfExercises={parts[0].exercises} />
      <Part part={parts[1].name} numberOfExercises={parts[1].exercises} />
      <Part part={parts[2].name} numberOfExercises={parts[2].exercises} />
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.numberOfExercises}
    </p>
  );
};

const Total = (props) => {
  const { parts } = props;
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
