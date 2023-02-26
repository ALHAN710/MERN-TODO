
export function modalBackdrop(add: boolean, withloader = false) {
  if (add) {
    if (!document.querySelector(".modal-backdrop")) {
      const bdy = window.document.body;
      bdy.classList.add("modal-open");
      bdy.style.cssText = "overflow: hidden; padding-right: 0px;";
      const el = document.createElement("div");
      el.className = "modal-backdrop fade show";
      if(withloader) {
        const loaderEl = document.createElement("div");
        el.className = "modal-backdrop fade show flex justify-center items-center";
        // loaderEl.className = "element-loader loader dual-loader mx-auto";
        loaderEl.className = "spinner-grow text-success align-self-center";
        // <div className="element-loader loader dual-loader mx-auto"></div>
        el.appendChild(loaderEl);
      }
      // el.onclick = () => console.log("overlay clicked");
      // console.log(el);
      bdy.appendChild(el);
    }
  } else {
    const modalBackdrop = document.querySelector(
      ".modal-backdrop"
    ) as HTMLDivElement;
    if (modalBackdrop) document.body.removeChild(modalBackdrop);
    document.body.classList.remove("modal-open");
    document.body.style.cssText = "";
  }
}
