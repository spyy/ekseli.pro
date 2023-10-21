
function Loading(props) {
    return (
        <main className="container">
            <div className="d-flex vh-100 align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Lataa...</span>
                </div>
                <div>
                    <p>{ props.text }</p>
                </div>
            </div>
        </main>
    );
  }
  
  
  export default Loading;