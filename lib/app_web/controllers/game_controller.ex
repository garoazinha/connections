defmodule AppWeb.GameController do
  use AppWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(html: :game)
    |> render(:index)
  end
end
