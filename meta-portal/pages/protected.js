import Layout from "../src/layout/Layout";
const Protected = () => {
  return (
    <Layout pageTitle={"Protected"}>
      <div className="metaportal_fn_protected">
        <div className="container">
          <div className="message_holder">
            <span className="icon">
              <img src="/svg/lock.svg" alt="" className="fn__svg" />
            </span>
            <h3
              className="fn__maintitle"
              data-text="Eres un jingler?"
              data-align="center"
            >
              Eres un jingler? 
            </h3>
            <p>Usa tu shib para identificar tu nivel y poder ingresar!</p>
            <div className="container-custom">
              <form>
                <input name="post_password" type="password" />
                <span className="submit">
                  <input
                    type="submit"
                    name="Submit"
                    className="button"
                    defaultValue="Authenticate"
                  />
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Protected;
