import "./Landing.css"

function Landing() {
  return (
    <div id="landingPage" class="flex flex-col justify-end h-screen 
    shadow-lg p-6">
        <div class="text-center h-1/2 mb-6">
            <h1 class="sm:text-6xl text-4xl font-bold">
                Which Pokemon Are You?
            </h1>
            <p class="sm:text-2xl text-lg">
                Website by Kevin Chandra for Nascent
            </p>
        </div>
        

        <a href="#form" class="self-center">
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth="2" stroke="currentColor" 
                class="w-10 h-10 stroke-black">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </a>
    </div>
  );
}

export default Landing;
