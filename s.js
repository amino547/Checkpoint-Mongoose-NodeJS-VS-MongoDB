const arrayOfPeople = [
    { name: 'Mary', age: 30, favoriteFoods: ['Pasta'] },
    { name: 'Alice', age: 22, favoriteFoods: ['baget', 'hamborgur'] },
  ];
  
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
  });