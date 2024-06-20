'use client';

export function Form({
    action,
    submit,
    formref,
    children,
  }: {
    action?: any;
    submit: any;
    formref: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        ref={formref}
        action={action}
        onSubmit={submit}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-xs text-gray-600 uppercase"
          >
            username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            autoComplete="username"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        {children}
      </form>
    );
  }