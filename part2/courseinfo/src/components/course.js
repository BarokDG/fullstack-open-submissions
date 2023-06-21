const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

const Total = ({ total }) => <strong>total of {total} exercises</strong>;

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, curr) => {
    sum += curr.exercises;
    return sum;
  }, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
