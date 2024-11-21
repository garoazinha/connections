defmodule AppWeb.Private.GameController do
  alias App.GameCreatorService
  use AppWeb, :controller

  @spec create(
          Plug.Conn.t(),
          binary()
          | maybe_improper_list(
              binary() | maybe_improper_list(any(), binary() | []) | byte(),
              binary() | []
            )
        ) :: Plug.Conn.t()
  def create(conn, params) do
    status = case Jason.decode(params) do
      {:ok, data} -> fn -> GameCreatorService.execute(data); 200 end
      _ -> 500
    end

    conn
      |> put_status(status)
      |> json(%{})
  end
end
