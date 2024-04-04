export const sortStudents =  async (students) => {
    await students.sort((a,b) => a.roll_number>b.roll_number ? 1 :-1)
}