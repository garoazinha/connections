defmodule AppWeb.GameController do
  alias AppWeb.Game.Game
  use AppWeb, :controller
  import AppWeb.Game

  def daily(conn, _params) do
    l = %Game{}
    render(conn, game: l)
  end
end
