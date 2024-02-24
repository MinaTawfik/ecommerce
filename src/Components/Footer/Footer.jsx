import React from "react"

export default function Footer(){

    return (
        <div className="footer bg-light">
            <div className="container p-5">
            <h4 className="">Get E-Commerce App</h4>
            <p>We will share a copy from our website</p>
                <form className="form-inline d-flex ">
                <label className="sr-only" htmlFor="inlineFormInputEmail2">Email</label>
                <input type="text" className="form-control mb-2 mr-sm-2 w-100" id="inlineFormInputEmail2" placeholder="Email"/>

                <button type="submit" className="btn btn-success mb-2 w-25 ms-5">Share Link</button>
                </form>
            </div>
        </div>
    )
}