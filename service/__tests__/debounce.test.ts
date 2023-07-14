import debounce from "../debounce";

it("should debounce", async () => {
  const DELAY_THAT_WILL_HOPEFULLY_NOT_LEAD_TO_FLAKYNESS_SORRY = 100;
  const LOOP_AMOUNT = 100;

  const value = { ref: 0 };

  const promise = new Promise((resolve) => {
    const debounced = debounce(() => {
      value.ref++;
      resolve(0);
    }, DELAY_THAT_WILL_HOPEFULLY_NOT_LEAD_TO_FLAKYNESS_SORRY);
    for (let i = 0; i < LOOP_AMOUNT; i++) {
      debounced();
    }
  });

  await promise;

  expect(value.ref).toBeGreaterThan(0);
  expect(value.ref).toBeLessThan(LOOP_AMOUNT);
});
