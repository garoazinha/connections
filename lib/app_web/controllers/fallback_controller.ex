defmodule AppWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use AppWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: AppWeb.ChangesetJSON)
    |> render(:error, changeset: changeset)
  end


  def call(conn, {:error, %{errors: _group} = data}) do
      conn
        |> put_status(422)
        |> json(data)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(html: AppWeb.ErrorHTML, json: AppWeb.ErrorJSON)
    |> render(:"404")
  end
end
