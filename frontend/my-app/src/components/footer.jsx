export default function Footer() {
  return (
    <footer className="px-32 pt-5 bg-slate-700">
      <h3 className="text-center font-bold text-2xl mb-5">Contacts</h3>
      <div className="grid grid-flow-col justify-stretch">
        <div>
          <p>
            <b>GitHub: </b>
            <a href="www.github.com/note-app">note-app</a>
          </p>
          <p>
            <b>Linkedin: </b>
            <a href="www.linkedin.com/in/kevin-chuquimarca-6a2562217/">
              kevin chuquimarca
            </a>
          </p>
        </div>
        <div>
          <p>
            <b>Phone: </b>+593 98 499 1746
          </p>
          <p>
            <b>Email: </b>santi.kevin0936@gmail.com
          </p>
        </div>
      </div>
      <p className="text-center pt-5">© 2023</p>
    </footer>
  );
}
