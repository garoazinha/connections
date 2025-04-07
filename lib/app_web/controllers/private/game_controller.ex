defmodule AppWeb.Private.GameController do

  alias App.GameCreatorService
  use AppWeb, :controller
  action_fallback AppWeb.FallbackController

  def create(conn, params) do

    with {:ok, result} <- GameCreatorService.execute(params) do
        conn
          |> put_status(200)
          |> json(result)
    end
  end
end
