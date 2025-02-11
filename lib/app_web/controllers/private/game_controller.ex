defmodule AppWeb.Private.GameController do
  alias App.GameCreatorService
  use AppWeb, :controller

  def create(conn, params) do

    GameCreatorService.execute(params)


    conn
      |> put_status(200)
      |> json(%{})
  end
end
