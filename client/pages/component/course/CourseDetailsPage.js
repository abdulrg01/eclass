import { useEffect, useState } from "react";
import Loader from "../Loader";
import CourseDetails from "./CourseDetails";
import { useGetCourseDetailsQuery } from "../../../redux/courses/coursesApi";
import Heading from "../../utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCreatePaymentIntentsMutation,
  useGetStripePublishableKeyQuery,
} from "../../../redux/orders/ordersApi";

export default function CourseDetailsPage({ id }) {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery();
  const [createPaymentIntents, { data: paymentIntentData }] =
    useCreatePaymentIntentsMutation();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data?.course?.price * 100);
      createPaymentIntents(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + " - ELearning"}
            description="ELearning is a platform for students to learn and help from teachers"
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data?.course}
              isLoading={isLoading}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
}
